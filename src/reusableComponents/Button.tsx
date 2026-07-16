function Button(props:{label:string}){
    return(<button classNameName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  {props.label}
</button>
)
}
export default Button