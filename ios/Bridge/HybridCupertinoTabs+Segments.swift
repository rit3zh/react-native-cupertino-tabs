import UIKit

extension HybridCupertinoTabs {

  var segmentRenderer: SegmentImageRenderer {
    SegmentImageRenderer(
      style: style,
      traitCollection: control.traitCollection,
      iconLoader: iconLoader
    )
  }

  func rebuildSegments() {
    ensureInitialCommit()

    if control.isFadingSegments, control.numberOfSegments == items.count {
      control.fadeSegments(duration: CupertinoTabsConstants.tintDuration) {
        buildSegments()
      }
      return
    }
    UIView.performWithoutAnimation { buildSegments() }
  }

  private func buildSegments() {
    let activeIndex = self.activeIndex
    renderedActiveIndex = activeIndex
    let images = segmentRenderer.images(for: items, activeIndex: activeIndex)

    let isReplacing = control.numberOfSegments != items.count
    if isReplacing {
      control.removeAllSegments()
    }

    for (index, item) in items.enumerated() {
      let image = images[index]

      if isReplacing {
        if let image {
          control.insertSegment(with: image, at: index, animated: false)
        } else {
          control.insertSegment(
            withTitle: item.label ?? "",
            at: index,
            animated: false
          )
        }
      } else if let image {
        control.setImage(image, forSegmentAt: index)
      } else {
        control.setTitle(item.label ?? "", forSegmentAt: index)
      }

      control.setEnabled(item.enabled ?? true, forSegmentAt: index)
    }

    if isReplacing {
      control.selectedSegmentIndex = min(
        max(Int(selectedIndex), UISegmentedControl.noSegment),
        control.numberOfSegments - 1
      )
    }
  }

  func refreshImageTints() {
    let activeIndex = self.activeIndex
    renderedActiveIndex = activeIndex
    let images = segmentRenderer.images(for: items, activeIndex: activeIndex)

    for (index, image) in images.enumerated() {
      guard index < control.numberOfSegments else { break }
      control.setImage(image, forSegmentAt: index)
    }
  }
}
