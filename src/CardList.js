import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCards } from "./endpoints"
import { nothing } from "./utils"


const CardList = ({onSelect=nothing}) => {
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCards().then(setCards)
    }, [])

    const Card = ({card}) => {
        return (
            <article
                onClick={() => {
                    navigate(card.pk + '')
                    onSelect(card)
                }}>
                {card.title}
            </article>
        )
    }

    return (
        <div className='card-titles'>
            {cards.map(card => <Card card={card} key={card.pk} />)}
        </div>
    )
}

export default CardList
