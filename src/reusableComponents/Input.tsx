type props = {
	placeHolder: string,
	type: string,
	id: string,
	name: string,
	label: string,
	handleChange: any
}

const inputClassName = 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

const Input = (props: props) => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
			<input
				type={props.type}
				name={props.name}
				id={props.id}
				onChange={props.handleChange}
				className={inputClassName}
				placeholder={props.placeHolder} />
		</div>)
}
export default Input