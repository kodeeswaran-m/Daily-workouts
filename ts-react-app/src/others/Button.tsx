interface ButtonAsButton{
    variant?:"primary"|"secondary",
    onClick:()=>void,
    href?:never
}

interface ButtonAsLink{
    variant?:"primary"|"secondary",
    href:string
    onClick?:never
}

type ButtonProp=ButtonAsButton|ButtonAsLink;

const Button = (props:ButtonProp) => {

    if("href" in props)
       return <a href={props.href}>{props.variant??"Button"}</a>
  return (
<button onClick={props.onClick}>{props.variant??"Button"}</button>  )
}

export default Button;