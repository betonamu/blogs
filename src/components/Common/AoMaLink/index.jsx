import classNames from "classnames";
import styles from "./index.module.scss";

function AoMaLink({ children, className, ...props }) {
  return (
    <a className={classNames(styles.link, className)} {...props}>
      <span>{children}</span>
    </a>
  );
}

export default AoMaLink;
