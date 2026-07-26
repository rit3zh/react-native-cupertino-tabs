import UIKit

final class CupertinoTabsHostView: UIView {
  let control: CupertinoSegmentedControl

  var preferredWidth: CGFloat?
  var preferredHeight: CGFloat?
  var cornerRadius: CGFloat?

  init(control: CupertinoSegmentedControl) {
    self.control = control
    super.init(frame: .zero)
    backgroundColor = .clear
    addSubview(control)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) is not supported")
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    let width = preferredWidth ?? bounds.width
    let height = preferredHeight ?? bounds.height
    control.frame = CGRect(
      x: ((bounds.width - width) / 2).rounded(),
      y: ((bounds.height - height) / 2).rounded(),
      width: width,
      height: height
    )
  }

  override func sizeThatFits(_ size: CGSize) -> CGSize {
    let fitted = control.sizeThatFits(size)
    return CGSize(
      width: preferredWidth ?? fitted.width,
      height: preferredHeight ?? fitted.height
    )
  }

  override var intrinsicContentSize: CGSize {
    sizeThatFits(UIView.layoutFittingCompressedSize)
  }
}
