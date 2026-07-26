import UIKit

struct LabelStyle {
  var font: UIFont

  var color: UIColor?

  var letterSpacing: CGFloat?
  var lineHeight: CGFloat?

  var weightName: String?

  init(_ style: CupertinoTabLabelStyle?) {
    let size = style?.fontSize.map { CGFloat($0) } ?? UIFont.systemFontSize
    let weight = TabsFontWeight.font(from: style?.fontWeight)

    var font: UIFont
    if let family = style?.fontFamily, !family.isEmpty,
      let named = UIFont(name: family, size: size)
    {

      font = named
    } else {
      font = .systemFont(ofSize: size, weight: weight)
    }

    if style?.fontStyle?.lowercased() == "italic",
      let italic = font.fontDescriptor.withSymbolicTraits(.traitItalic)
    {
      font = UIFont(descriptor: italic, size: size)
    }

    self.font = font
    color = style?.color.flatMap(UIColor.fromCSSString)
    letterSpacing = style?.letterSpacing.map { CGFloat($0) }
    lineHeight = style?.lineHeight.map { CGFloat($0) }
    weightName = style?.fontWeight
  }

  func attributes(tint: UIColor) -> [NSAttributedString.Key: Any] {
    var attributes: [NSAttributedString.Key: Any] = [
      .font: font,
      .foregroundColor: color ?? tint,
    ]

    if let letterSpacing {
      attributes[.kern] = letterSpacing
    }

    if let lineHeight {
      let paragraph = NSMutableParagraphStyle()
      paragraph.minimumLineHeight = lineHeight
      paragraph.maximumLineHeight = lineHeight
      attributes[.paragraphStyle] = paragraph

      attributes[.baselineOffset] = (lineHeight - font.lineHeight) / 4
    }

    return attributes
  }
}
