import React from 'react'
import { GridList, GridTile, Card, CardHeader, CardTitle, CardText, TextField   } from 'material-ui'

const style = {
    gridTile: {
        width: '33.3%',
        border: '1px solid #eee',
        borderRadius: 2
    },
    card: {},
    title: {
       paddingBottom: 0
    },
    body: {
        paddingTop: 0
    }
}

class NoteView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="state-todo">
                <h2>Notes</h2>

                <GridTile style={style.gridTile}>
                    <Card style={style.card}>
                        <CardTitle children={<TextField hintText="Note title" fullWidth={true}/>} style={style.title}/>

                        <CardText children={<TextField fullWidth={true} multiLine={true} rows={4} floatingLabelText="Write your note here..."/>} style={style.body}/>
                    </Card>
                </GridTile>
            </div>
        )
    }
}

export default NoteView
