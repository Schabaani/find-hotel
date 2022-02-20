import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    marginBottom: -60,
  },
  imageContainer: {
    marginTop: -40,
    borderRadius: 50,
  },
  hr: {
    width: '100%',
    height: 4,
    backgroundColor: '#f7f8fc',
    marginBottom: 5,
  },
  desciption: {
    fontSize: 15,
    color: '#2e4057',
    marginTop: 10,
    marginBottom: 20,
  },
  infoRow: {
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastRow: {
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  evenRow: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f6f6f6',
  },
  title: {fontSize: 15, color: '#2e4057'},
  value: {fontSize: 15, color: '#2e4057'},
  shareBtn: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  shareImg: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  viewShot: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerRow: {alignItems: 'center'},
  footerLogo: {backgroundColor: '#0b074c', borderRadius: 3, padding: 2},
  footerInfo: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  bottomCover: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default styles;
