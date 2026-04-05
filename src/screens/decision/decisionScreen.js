import { createStackNavigator } from "@react-navigation/stack";
import DecisionTimeScreen from "./DecisionTimeScreen";
import WhosGoingScreen from "./WhosGoingScreen";
import PreFiltersScreen from "./PreFiltersScreen";
import ChoiceScreen from "./ChoiceScreen";
import PostChoiceScreen from "./PostChoiceScreen";

const Stack = createStackNavigator();

export default function DecisionScreen() {
  return (
    <Stack.Navigator initialRouteName="DecisionTime" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecisionTime" component={DecisionTimeScreen} />
      <Stack.Screen name="WhosGoing" component={WhosGoingScreen} />
      <Stack.Screen name="PreFilters" component={PreFiltersScreen} />
      <Stack.Screen name="Choice" component={ChoiceScreen} />
      <Stack.Screen name="PostChoice" component={PostChoiceScreen} />
    </Stack.Navigator>
  );
}
