export default function DialogContent({ className, onClick, children }) {
	return (
		<div
			className={className}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.stopPropagation();
				}
			}}
			role="button"
			tabIndex={0}
		>
			{children}
		</div>
	);
}
