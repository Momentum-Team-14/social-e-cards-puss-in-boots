import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CardStyles from "./CardStyles"
import { createCard } from "./endpoints"
import { handleUpdate } from "./utils"

const CardCreate = ({token}) => {
    const [title, setTitle] = useState('')
    const [outerText, setOuterText] = useState('')
    const [innerText, setInnerText] = useState('')
    const [style, setStyle] = useState(1)
    const navigate = useNavigate()

    return (<form onSubmit={e => {
        e.preventDefault()
        createCard(token, {
            title, style,
            outer_message: outerText,
            inner_message: innerText,
        }).then(card => navigate(`/cards/${card.pk}`))
    }}>
        <div><input
            value={title}
            id="title"
            onChange={handleUpdate(setTitle)}
            placeholder="Title"
        /></div>
        <div><textarea
            value={outerText}
            id="outer"
            onChange={handleUpdate(setOuterText)}
            placeholder="Outer Message"
        /></div>
        <div><textarea
            value={innerText}
            id="inner"
            onChange={handleUpdate(setInnerText)}
            placeholder="Inner Message"
        /></div>
        <div><CardStyles onUpdate={setStyle} /></div>
        <div><button className="btn btn-primary">Create Card</button></div>
    </form>)
}

export default CardCreate
