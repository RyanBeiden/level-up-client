import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"


export const GameForm = props => {
    const { createGame, editGame, getGameTypes, gameTypes, getSingleGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if("gameId" in props.match.params) {
            getSingleGame(props.match.params.gameId).then(game => {
                setCurrentGame({
                    skillLevel: game.skill_level,
                    numberOfPlayers: game.number_of_players,
                    title: game.title,
                    maker: game.maker,
                    gameTypeId: game.game_type
                })
            })
        }
    }, [props.match.params.gameId])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">* Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">* Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">* Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">* Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="gametypes">Choose a gametype: </label>
                <select name="gameTypeId" onChange={handleControlledInputChange}>
                    <option value="0">Select a type</option>
                    {
                        gameTypes.map(gameType => {
                            return <option value={gameType.id} key={gameType.id}>{gameType.label}</option>
                        })
                    }
                </select>
            </fieldset>
            {
                ("gameId" in props.match.params)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
        
                            const game = {
                                id: props.match.params.gameId,
                                maker: currentGame.maker,
                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                skillLevel: parseInt(currentGame.skillLevel),
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }
        
                            // Send POST request to your API
                            editGame(game).then(() => props.history.push('/games'))
                        }}
                        className="btn btn-primary" style={{ backgroundColor: '#3844ec', color: '#fff' }}>Edit</button>
                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()
        
                            const game = {
                                maker: currentGame.maker,
                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                skillLevel: parseInt(currentGame.skillLevel),
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }
        
                            // Send POST request to your API
                            createGame(game)
                        }}
                        className="btn btn-primary" style={{ backgroundColor: '#2ecc71', color: '#fff' }}>Create</button>
            }
        </form>
    )
}