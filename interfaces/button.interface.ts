export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  custom?: number;
  animate?: any;
  initial?: any;
  variants?: any;
  whileHover?: any;
}