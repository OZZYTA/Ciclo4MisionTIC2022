import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#2B4055',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    marginRight: 5,
    color: 'white',
  },
  time: {
    color: 'darkgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    backgroundColor: '#2B4055',
    marginLeft: 5,
    flexDirection: "row",
    height:20
  }
});

export default styles;