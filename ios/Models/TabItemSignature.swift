import Foundation

enum TabItemSignature {

  static func make(for items: [CupertinoTabItem]) -> String {
    var parts: [String] = []
    parts.reserveCapacity(items.count * 18)

    for item in items {
      let icon = item.icon
      let label = item.labelStyle
      let enabled: String = item.enabled.map { $0 ? "1" : "0" } ?? ""

      parts.append(item.label ?? "")
      parts.append(enabled)
      parts.append(item.accessibilityLabel ?? "")
      parts.append(icon?.systemName ?? "")
      parts.append(icon?.uri ?? "")
      parts.append(number(icon?.size))
      parts.append(icon?.color ?? "")
      parts.append(icon?.weight ?? "")
      parts.append(number(icon?.width))
      parts.append(number(icon?.height))
      parts.append(number(icon?.borderRadius))
      parts.append(label?.fontFamily ?? "")
      parts.append(number(label?.fontSize))
      parts.append(label?.fontWeight ?? "")
      parts.append(label?.fontStyle ?? "")
      parts.append(number(label?.letterSpacing))
      parts.append(number(label?.lineHeight))
      parts.append(label?.color ?? "")
    }
    return parts.joined(separator: "\u{1}")
  }

  private static func number(_ value: Double?) -> String {
    value.map { String($0) } ?? ""
  }
}
