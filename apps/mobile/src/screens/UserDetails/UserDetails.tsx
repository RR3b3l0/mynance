import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useUser} from '../../api/users/hooks';
import {UserDetail} from '@mynance/shared-ui';
import {RootScreens, ScreenProps} from '../../navigation/types';

type WeatherDetailsProps = ScreenProps<RootScreens.UserDetails>;

const UserDetails: React.FC<WeatherDetailsProps> = props => {
  const {id} = props.route.params;
  const {data, isLoading, isError, refetch} = useUser(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError || data === undefined) {
    return <Text>OOPS</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <UserDetail user={data} refreshData={refetch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default UserDetails;
