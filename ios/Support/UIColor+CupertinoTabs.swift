import UIKit

extension UIColor {

  static func fromCSSString(_ value: String) -> UIColor? {
    let input = value.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
    if input == "transparent" { return .clear }

    if input.hasPrefix("#") {
      var hex = String(input.dropFirst())
      if hex.count == 3 || hex.count == 4 {
        hex = hex.map { "\($0)\($0)" }.joined()
      }
      guard hex.count == 6 || hex.count == 8,
        let value = UInt64(hex, radix: 16)
      else { return nil }

      let hasAlpha = hex.count == 8
      let r = CGFloat((value >> (hasAlpha ? 24 : 16)) & 0xFF) / 255
      let g = CGFloat((value >> (hasAlpha ? 16 : 8)) & 0xFF) / 255
      let b = CGFloat((value >> (hasAlpha ? 8 : 0)) & 0xFF) / 255
      let a = hasAlpha ? CGFloat(value & 0xFF) / 255 : 1
      return UIColor(red: r, green: g, blue: b, alpha: a)
    }

    if input.hasPrefix("rgb") {
      let components =
        input
        .drop(while: { $0 != "(" })
        .dropFirst()
        .prefix(while: { $0 != ")" })
        .split(separator: ",")
        .compactMap { Double($0.trimmingCharacters(in: .whitespaces)) }
      guard components.count >= 3 else { return nil }
      return UIColor(
        red: CGFloat(components[0]) / 255,
        green: CGFloat(components[1]) / 255,
        blue: CGFloat(components[2]) / 255,
        alpha: components.count > 3 ? CGFloat(components[3]) : 1
      )
    }

    return nil
  }

  static func isTransparentKeyword(_ value: String) -> Bool {
    value.trimmingCharacters(in: .whitespaces).lowercased() == "transparent"
  }
}
