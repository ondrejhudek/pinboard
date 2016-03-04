//import React, { PropTypes } from 'react'
//import { GridTile, Card, CardTitle, CardText, TextField } from 'material-ui'
//
//import { connect } from 'react-redux'
//import { updateNote } from '../../actions'
//
//const style = {
//    gridTile: {
//        display: 'inline-block',
//        width: '32%',
//        margin: '0.5%',
//        border: '1px solid #eee',
//        borderRadius: 2
//    },
//    card: {},
//    title: {
//        paddingBottom: 0,
//        fontWeight: 500
//    },
//    titleHint: {
//        top: 12,
//        bottom: 'auto'
//    },
//    body: {
//        paddingTop: 0
//    }
//}
//
///*
// class Title extends React.Component {
// constructor(props) {
// super(props)
//
// this.state = {
// title: this.props.text
// }
//
// this.handleChange = this.handleChange.bind(this)
// this.handleBlur = this.handleBlur.bind(this)
// }
//
// handleChange(e) {
// this.setState({title: e.target.value})
// }
//
// handleBlur(e) {
//
// }
//
// render() {
// return (
// <TextField hintText="Note title" value={this.state.title} fullWidth={true} onChange={this.handleChange} onBlur={this.handleBlur}/>
// )
// }
// }
// */
//
//let Title = ({ dispatch, text }) => {
//    const handleBlur = (e) => {
//        dispatch(updateNote(value, ''))
//    }
//
//    return (
//        <TextField hintText="Note title" defaultValue={text} fullWidth={true} onBlur={handleBlur}/>
//    )
//}
//
//Title = connect()(Title)
//
//class Body extends React.Component {
//    constructor(props) {
//        super(props)
//
//        this.state = {
//            body: this.props.text
//        }
//
//        this.handleChange = this.handleChange.bind(this)
//    }
//
//    handleChange(e) {
//        this.setState({body: e.target.value})
//    }
//
//    render() {
//        return (
//            <TextField value={this.state.body} fullWidth={true} multiLine={true} rows={4} hintText="Write your note here..." hintStyle={style.titleHint}
//                       onChange={this.handleChange}/>
//        )
//    }
//}
//
//const Note = ({ _id, title, body }) => (
//    <GridTile style={style.gridTile}>
//        <Card style={style.card}>
//            <CardTitle children={<Title text={title}/>} style={style.title}/>
//            <CardText children={<Body text={body}/>} style={style.body}/>
//        </Card>
//    </GridTile>
//)
//
//Note.propTypes = {
//    _id: PropTypes.string.isRequired,
//    title: PropTypes.string.isRequired,
//    body: PropTypes.string.isRequired
//}
//
//export default Note

import React, { PropTypes } from 'react'
import { GridTile, Card, CardTitle, CardText, TextField } from 'material-ui'

import { connect } from 'react-redux'
import { updateNote } from '../../actions'

const style = {
    gridTile: {
        display: 'inline-block',
        width: '32%',
        margin: '0.5%',
        border: '1px solid #eee',
        borderRadius: 2
    },
    card: {},
    title: {
        paddingBottom: 0,
        fontWeight: 500
    },
    titleHint: {
        top: 12,
        bottom: 'auto'
    },
    body: {
        paddingTop: 0
    }
}

//let Title = ({ dispatch, text }) => {
//    const handleBlur = (e) => {
//        dispatch(updateNote(value, ''))
//    }
//
//    return (
//        <TextField hintText="Note title" defaultValue={text} fullWidth={true} onBlur={handleBlur}/>
//    )
//}

//Title = connect()(Title)
//
//class Body extends React.Component {
//    constructor(props) {
//        super(props)
//
//        this.state = {
//            body: this.props.text
//        }
//
//        this.handleChange = this.handleChange.bind(this)
//    }
//
//    handleChange(e) {
//        this.setState({body: e.target.value})
//    }
//
//    render() {
//        return (
//            <TextField value={this.state.body} fullWidth={true} multiLine={true} rows={4} hintText="Write your note here..." hintStyle={style.titleHint}
//                       onChange={this.handleChange}/>
//        )
//    }
//}

let Note = ({ dispatch, id, _id, title, body }) => {
    const TitleField = () => (
        <TextField hintText="Note title" defaultValue={title} fullWidth={true} onChange={handleTitleChange} onBlur={handleBlur}/>
    )

    const BodyField = () => (
        <TextField defaultValue={body} fullWidth={true} multiLine={true} rows={4} hintText="Write your note here..." hintStyle={style.titleHint} onChange={handleBodyChange}
                   onBlur={handleBlur}/>
    )

    const handleTitleChange = (e) => {
        title = e.target.value
    }

    const handleBodyChange = (e) => {
        body = e.target.value
    }

    const handleBlur = () => {
        dispatch(updateNote(id, _id, title, body))
    }

    return (
        <GridTile style={style.gridTile}>
            <Card style={style.card}>
                <CardTitle children={<TitleField />} style={style.title}/>
                <CardText children={<BodyField />} style={style.body}/>
            </Card>
        </GridTile>
    )
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
}

Note = connect()(Note)

export default Note
