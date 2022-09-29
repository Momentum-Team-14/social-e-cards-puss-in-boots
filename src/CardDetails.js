import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CommentList from "./CommentList"
import { getCard } from "./endpoints"

const CardDetails = (props) => {
    const [card, setCard] = useState(props.card)
    const [showFront, setShowFront] = useState(true)
    const { pk } = useParams()
    useEffect(() => {
        if (!card) {
            getCard(pk).then(setCard)
        }
    }, [card, pk])

    if (!card) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h1>{card.title}</h1>
            <div>by {card.owner.username}</div>
            <div
                onClick={() => setShowFront(!showFront)}
            >{showFront ? card.outer_message : card.inner_message}</div>
            <CommentList comments={card.comments}/>
        </div>
    )
}

export default CardDetails
