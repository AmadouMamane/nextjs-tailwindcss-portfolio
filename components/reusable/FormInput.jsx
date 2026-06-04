const FormInput = ({
	inputLabel,
	labelFor,
	inputType,
	inputId,
	inputName,
	placeholderText,
	ariaLabelName,
}) => {
	return (
		<div className="font-general-regular mb-4">
			<label
				className="block text-lg text-primary-dark dark:text-primary-light mb-1"
				htmlFor={labelFor}
			>
				{inputLabel}
			</label>
			<input
				className="w-full px-5 py-2.5 border border-slate-200/80 dark:border-white/[0.1] rounded-xl text-md bg-white/50 dark:bg-white/[0.04] text-primary-dark dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm backdrop-blur-sm transition-all"
				type={inputType}
				id={inputId}
				name={inputName}
				placeholder={placeholderText}
				aria-label={ariaLabelName}
				required
			/>
		</div>
	);
};

export default FormInput;
