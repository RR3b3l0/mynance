import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useUsers} from '../../api/users/hooks';
import {InformationForm, UserList} from '@mynance/shared-ui';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootScreens, RootStackParamList} from '../../navigation/types';

const HomeScreen = () => {
  const {data, isLoading, isError, refetch} = useUsers();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (isLoading) {
    return <ActivityIndicator testID='loading'/>;
  }

  if (isError) {
    return <Text>OOPS</Text>;
  }

  const navigateToUser = (id: string) =>
    navigation.navigate(RootScreens.UserDetails, {
      id,
    });

  return (
    <SafeAreaView style={styles.container}>
      {data && data?.length > 0 ? (
        <UserList
          users={data}
          onNavigateToUser={navigateToUser}
          refreshData={() => refetch()}
        />
      ) : (
        <InformationForm refreshData={() => refetch()} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    maxHeight: '30%',
  },
});

export default HomeScreen;
