// @flow
import Mode from './Mode'
import { connect } from 'react-redux'
import * as actions from './actions' // mapDispatchToProps
import { getNav, getMode, getLogin } from '../../reducers/rootReducer'

// Combining 1 or + actionCreators
// const mapDispatchToProps = () => ({
//   ...actionsDuplicate,
//   ...actions,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

const mapStateToProps = (state) => ({
  ...getNav(state),
  ...getMode(state),
  ...getLogin(state),
})

export default connect(mapStateToProps, actions)(Mode)
