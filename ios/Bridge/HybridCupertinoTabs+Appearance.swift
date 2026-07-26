import UIKit

extension HybridCupertinoTabs {

  var style: TabsStyle {
    TabsStyle(
      activeTintColor: activeTintColor,
      inactiveTintColor: inactiveTintColor,
      backgroundColor: backgroundColor,
      selectedBackgroundColor: selectedBackgroundColor,
      cornerRadius: cornerRadius,
      width: width,
      height: height,
      direction: direction,
      gap: gap,
      iconSize: iconSize,
      apportionsSegmentWidthsByContent: apportionsSegmentWidthsByContent
    )
  }

  func applyAppearance() {
    let style = self.style

    view.preferredWidth = style.width
    view.preferredHeight = style.height
    view.cornerRadius = style.cornerRadius
    control.trackCornerRadius = style.cornerRadius

    control.apportionsSegmentWidthsByContent = style.apportionsSegmentWidthsByContent

    control.isTrackTransparent = style.isTrackTransparent
    control.backgroundColor = style.trackColor

    control.isSelectionTransparent = style.isSelectionTransparent
    control.selectedSegmentTintColor = style.selectionColor

    let states: [UIControl.State] = [
      .normal, .selected, .highlighted, [.selected, .highlighted],
    ]
    for state in states {
      control.setTitleTextAttributes(
        [
          .font: UIFont.systemFont(ofSize: UIFont.systemFontSize),
          .foregroundColor: style.inactiveColor,
        ],
        for: state
      )
    }

    control.setNeedsLayout()
  }
}
