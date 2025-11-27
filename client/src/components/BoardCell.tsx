
import type { BoardCellProps } from "../interfaces/GameBoardTypes";
import { COLOR_CLASSES } from "../config/constants";


export function BoardCell({ cell, rowIndex, colIndex, onClick, isCooldown, cooldownTurns }: BoardCellProps) {
  
  const getShapeIcon = () => {
    const size = "60%";
    switch (cell.shape) {
      case "Circle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case "Square":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <rect x="4" y="4" width="16" height="16" />
          </svg>
        );
      case "Diamond":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <path d="M12 2L22 12L12 22L2 12Z" />
          </svg>
        );
      case "Triangle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
            <path d="M12 2L22 20H2Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const baseColorClass = COLOR_CLASSES[cell.backgroundColor];
  const opacityClass = isCooldown ? "opacity-60" : ""; 
  const buttonClass = `${baseColorClass} ${opacityClass}`;

  return (
    <button
      type="button"
      onClick={() => onClick(rowIndex, colIndex)}
      className={`board-cell ${buttonClass} border-2 border-gray-800 flex items-center justify-center focus:outline-none relative`}
      disabled={isCooldown}
    >
      {getShapeIcon()}
      
      {isCooldown && (
          <div className="absolute top-1 right-1 bg-black text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cooldownTurns}
          </div>
      )}
    </button>
  );
}