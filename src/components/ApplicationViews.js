import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"
import { GameProvider } from "./game/GameProvider"
import { EventProvider } from "./game/EventProvider"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from './auth/Profile'
import { EventList } from "./game/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./game/EventForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <GameProvider>
                <EventProvider>
                    <Route exact path="/games" render={props => <GameList {...props} />} />
                </EventProvider>
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
                <Route exact path="/games/:gameId(\d+)/edit" render={props => <GameForm {...props} />} />
            </GameProvider>

            <GameProvider>
                <EventProvider>
                    <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                </EventProvider>
            </GameProvider>

            <ProfileProvider>
                <EventProvider>
                    <Route exact path="/profile"><Profile /></Route>
                </EventProvider>
            </ProfileProvider>

            <GameProvider>
                <EventProvider>
                    <Route exact path="/" render={props => <GameList {...props} />} />
                    <Route exact path="/events" render={props => <EventList {...props} />} />
                </EventProvider>
            </GameProvider>
        </main>
    </>
}
