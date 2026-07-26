import SwiftUI
import UIKit

struct TabsStyle {
  var activeColor: UIColor
  var inactiveColor: UIColor

  var trackColor: UIColor?
  var isTrackTransparent: Bool
  var selectionColor: UIColor?
  var isSelectionTransparent: Bool

  var width: CGFloat?
  var height: CGFloat?
  var cornerRadius: CGFloat?
  var apportionsSegmentWidthsByContent: Bool

  var direction: TabsDirection

  var gap: CGFloat

  var iconPointSize: CGFloat

  init(
    activeTintColor: String?,
    inactiveTintColor: String?,
    backgroundColor: String?,
    selectedBackgroundColor: String?,
    cornerRadius: Double?,
    width: Double?,
    height: Double?,
    direction: String?,
    gap: Double?,
    iconSize: Double?,
    apportionsSegmentWidthsByContent: Bool?
  ) {

    let activeTintColor = Self.text(activeTintColor)
    let inactiveTintColor = Self.text(inactiveTintColor)
    let backgroundColor = Self.text(backgroundColor)
    let selectedBackgroundColor = Self.text(selectedBackgroundColor)
    let cornerRadius = Self.number(cornerRadius)
    let width = Self.number(width)
    let height = Self.number(height)

    activeColor = activeTintColor.flatMap(UIColor.fromCSSString) ?? .label
    inactiveColor = inactiveTintColor.flatMap(UIColor.fromCSSString) ?? .secondaryLabel

    isTrackTransparent = backgroundColor.map(UIColor.isTransparentKeyword) ?? false
    trackColor = isTrackTransparent ? .clear : backgroundColor.flatMap(UIColor.fromCSSString)

    isSelectionTransparent =
      selectedBackgroundColor.map(UIColor.isTransparentKeyword) ?? false
    let barTint: Color = .gray.opacity(50)
    selectionColor =
      isSelectionTransparent
      ? UIColor(barTint) : selectedBackgroundColor.flatMap(UIColor.fromCSSString)

    self.width = width.map { CGFloat($0) }
    self.height = height.map { CGFloat($0) }
    self.cornerRadius = cornerRadius.map { CGFloat($0) }
    self.apportionsSegmentWidthsByContent = apportionsSegmentWidthsByContent ?? false

    let direction = TabsDirection(Self.text(direction))
    self.direction = direction
    self.gap = Self.number(gap).map { CGFloat($0) } ?? direction.defaultGap
    iconPointSize =
      Self.number(iconSize).map { CGFloat($0) }
      ?? CupertinoTabsConstants.defaultIconPointSize
  }

  private static func text(_ value: String?) -> String? {
    guard let value, !value.isEmpty else { return nil }
    return value
  }

  private static func number(_ value: Double?) -> Double? {
    guard let value, value >= 0 else { return nil }
    return value
  }

  func contentColor(isActive: Bool) -> UIColor {
    isActive ? activeColor : inactiveColor
  }
}
