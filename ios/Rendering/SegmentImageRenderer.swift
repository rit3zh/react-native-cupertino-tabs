import UIKit

struct SegmentImageRenderer {
  let style: TabsStyle
  let traitCollection: UITraitCollection
  let iconLoader: TabIconLoader

  func images(for items: [CupertinoTabItem], activeIndex: Int) -> [UIImage?] {
    let contents = items.enumerated().map { index, item in
      content(for: item, isActive: index == activeIndex)
    }
    let metrics = Metrics(
      contents: contents,
      gap: style.gap,
      direction: style.direction,
      isUniformWidth: !style.apportionsSegmentWidthsByContent
    )
    return contents.map { compose($0, metrics: metrics) }
  }

  private struct Content {
    var icon: UIImage?
    var text: NSAttributedString?
    var textSize: CGSize
    var accessibilityLabel: String?

    var hasIcon: Bool { icon != nil }
    var hasText: Bool { text != nil }
  }

  private struct Metrics {
    var iconHeight: CGFloat
    var labelHeight: CGFloat
    var gap: CGFloat
    var direction: TabsDirection
    var width: CGFloat?

    init(
      contents: [Content],
      gap: CGFloat,
      direction: TabsDirection,
      isUniformWidth: Bool
    ) {
      iconHeight = contents.reduce(0) { max($0, $1.icon?.size.height ?? 0) }
      labelHeight = contents.reduce(0) { max($0, $1.hasText ? $1.textSize.height : 0) }
      let gap = iconHeight > 0 && labelHeight > 0 ? gap : 0
      self.gap = gap
      self.direction = direction

      guard isUniformWidth else {
        width = nil
        return
      }
      width = contents.reduce(0) { widest, content in
        max(widest, Self.naturalWidth(of: content, gap: gap, direction: direction))
      }
    }

    var height: CGFloat {
      switch direction {
      case .row: return max(iconHeight, labelHeight)
      case .column: return iconHeight + gap + labelHeight
      }
    }

    static func naturalWidth(
      of content: Content,
      gap: CGFloat,
      direction: TabsDirection
    ) -> CGFloat {
      let iconWidth = content.icon?.size.width ?? 0
      let textWidth = content.hasText ? content.textSize.width : 0

      switch direction {
      case .row:
        let inlineGap: CGFloat = content.hasIcon && content.hasText ? gap : 0
        return iconWidth + inlineGap + textWidth
      case .column:
        return max(iconWidth, textWidth)
      }
    }
  }

  private func content(for item: CupertinoTabItem, isActive: Bool) -> Content {
    let tint = resolved(style.contentColor(isActive: isActive))
    let labelStyle = LabelStyle(item.labelStyle)
    let label = item.label.flatMap { $0.isEmpty ? nil : $0 }

    var icon: UIImage?
    if let spec = item.icon {
      let iconColor = spec.color.flatMap(UIColor.fromCSSString).map(resolved) ?? tint
      icon = self.icon(spec, color: iconColor, labelStyle: labelStyle)
    }

    guard let label else {
      return Content(
        icon: icon,
        text: nil,
        textSize: .zero,
        accessibilityLabel: item.accessibilityLabel
      )
    }

    let text = NSAttributedString(
      string: label,
      attributes: labelStyle.attributes(tint: tint)
    )
    return Content(
      icon: icon,
      text: text,
      textSize: text.size(),
      accessibilityLabel: item.accessibilityLabel ?? label
    )
  }

  private func compose(_ content: Content, metrics: Metrics) -> UIImage? {
    guard content.hasIcon || content.hasText else { return nil }

    let iconSize = content.icon?.size ?? .zero
    let textSize = content.hasText ? content.textSize : .zero
    let inlineGap: CGFloat = content.hasIcon && content.hasText ? metrics.gap : 0
    let naturalWidth = Metrics.naturalWidth(
      of: content,
      gap: metrics.gap,
      direction: metrics.direction
    )

    let size = CGSize(
      width: ceil(max(metrics.width ?? naturalWidth, 1)),
      height: ceil(max(metrics.height, 1))
    )

    let composed = UIGraphicsImageRenderer(size: size).image { _ in
      switch metrics.direction {
      case .row:
        let originX = ((size.width - naturalWidth) / 2).rounded()
        if let icon = content.icon {
          icon.draw(
            in: CGRect(
              x: originX,
              y: ((size.height - iconSize.height) / 2).rounded(),
              width: iconSize.width,
              height: iconSize.height
            )
          )
        }
        content.text?.draw(
          at: CGPoint(
            x: originX + iconSize.width + inlineGap,
            y: ((size.height - textSize.height) / 2).rounded()
          )
        )
      case .column:
        if let icon = content.icon {
          let iconY =
            content.hasText
            ? ((metrics.iconHeight - iconSize.height) / 2).rounded()
            : ((size.height - iconSize.height) / 2).rounded()
          icon.draw(
            in: CGRect(
              x: ((size.width - iconSize.width) / 2).rounded(),
              y: iconY,
              width: iconSize.width,
              height: iconSize.height
            )
          )
        }
        content.text?.draw(
          at: CGPoint(
            x: ((size.width - textSize.width) / 2).rounded(),
            y: metrics.iconHeight + metrics.gap
              + ((metrics.labelHeight - textSize.height) / 2).rounded()
          )
        )
      }
    }

    let image = composed.withRenderingMode(.alwaysOriginal)
    image.accessibilityLabel = content.accessibilityLabel
    return image
  }

  private func icon(
    _ icon: CupertinoTabIcon,
    color: UIColor,
    labelStyle: LabelStyle
  ) -> UIImage? {
    let pointSize = icon.size.map { CGFloat($0) } ?? style.iconPointSize

    if let systemName = icon.systemName, !systemName.isEmpty {
      let configuration = UIImage.SymbolConfiguration(
        pointSize: pointSize,
        weight: TabsFontWeight.symbol(from: icon.weight ?? labelStyle.weightName)
      )
      return UIImage(systemName: systemName, withConfiguration: configuration)?
        .withTintColor(color, renderingMode: .alwaysOriginal)
    }

    guard let uri = icon.uri, !uri.isEmpty, let image = iconLoader.image(for: uri) else {
      return nil
    }

    let size = self.size(for: image, icon: icon, pointSize: pointSize)
    let radius = icon.borderRadius.map { CGFloat($0) } ?? 0
    let bounds = CGRect(origin: .zero, size: size)

    let resized = UIGraphicsImageRenderer(size: size).image { _ in
      if radius > 0 {
        UIBezierPath(
          roundedRect: bounds,
          cornerRadius: min(radius, min(size.width, size.height) / 2)
        ).addClip()
      }
      image.draw(in: Self.coveringRect(for: image.size, in: bounds))
    }

    if icon.color != nil {
      return resized.withTintColor(color, renderingMode: .alwaysOriginal)
    }
    return resized.withRenderingMode(.alwaysOriginal)
  }

  private func size(
    for image: UIImage,
    icon: CupertinoTabIcon,
    pointSize: CGFloat
  ) -> CGSize {
    let width = icon.width.map { CGFloat($0) }
    let height = icon.height.map { CGFloat($0) }
    let ratio = image.size.width / max(image.size.height, 1)

    switch (width, height) {
    case let (width?, height?):
      return CGSize(width: width.rounded(), height: height.rounded())
    case let (width?, nil):
      return CGSize(width: width.rounded(), height: (width / ratio).rounded())
    case let (nil, height?):
      return CGSize(width: (height * ratio).rounded(), height: height.rounded())
    case (nil, nil):
      return CGSize(
        width: (pointSize * ratio).rounded(),
        height: pointSize.rounded()
      )
    }
  }

  private static func coveringRect(for size: CGSize, in bounds: CGRect) -> CGRect {
    guard size.width > 0, size.height > 0 else { return bounds }
    let scale = max(bounds.width / size.width, bounds.height / size.height)
    let scaled = CGSize(width: size.width * scale, height: size.height * scale)
    return CGRect(
      x: bounds.midX - scaled.width / 2,
      y: bounds.midY - scaled.height / 2,
      width: scaled.width,
      height: scaled.height
    )
  }

  private func resolved(_ color: UIColor) -> UIColor {
    color.resolvedColor(with: traitCollection)
  }
}
