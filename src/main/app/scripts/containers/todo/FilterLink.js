import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../actions/todos'
import Link from '../../components/todo/Link'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === ownProps.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.id, ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink
