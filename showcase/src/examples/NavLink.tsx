import * as stylex from "@stylexjs/stylex";
import { NavLink } from "../../../src";
import { colors } from "../../../src/tokens.stylex";

export default function NavLinkExample() {
  return (
    <nav aria-label="Example" {...stylex.props(styles.nav)}>
      <NavLink to="/" end style={styles.link} activeStyle={styles.active}>
        Home
      </NavLink>
      <NavLink to="/events" style={styles.link} activeStyle={styles.active}>
        Events
      </NavLink>
      <NavLink to="/about" style={styles.link} activeStyle={styles.active}>
        About
      </NavLink>
    </nav>
  );
}

const styles = stylex.create({
  nav: {
    display: "flex",
    gap: "2rem",
  },
  link: {
    color: colors.textMuted,
  },
  active: {
    color: colors.primary,
    fontWeight: 700,
  },
});
