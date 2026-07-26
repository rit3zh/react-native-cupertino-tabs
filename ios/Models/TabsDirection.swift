import CoreGraphics

enum TabsDirection {

  case row

  case column

  init(_ raw: String?) {
    switch raw?.lowercased() {
    case "column": self = .column
    default: self = .row
    }
  }

  var defaultGap: CGFloat {
    switch self {
    case .row: return CupertinoTabsConstants.defaultRowGap
    case .column: return CupertinoTabsConstants.defaultColumnGap
    }
  }
}
