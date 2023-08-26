interface IProps {
  $target: HTMLElement;
}

interface IThis {
  $button: HTMLElement;
}

export default function ToTop(this: IThis, { $target }: IProps) {
  this.$button = document.createElement("button");
  this.$button.setAttribute("type", "button");
  this.$button.innerHTML = "맨위로";
  this.$button.className = "App-top";

  $target.appendChild(this.$button);

  this.$button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
