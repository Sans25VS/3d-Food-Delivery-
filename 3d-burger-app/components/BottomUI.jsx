import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { INGREDIENTS, useSandwich } from "../hooks/useSandwich";
import { AwesomeButton } from "./AwesomeButton";
import { useCallback, useMemo } from "react";

// Helper function: Capitalize first letter of ingredient names
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const BottomUI = () => {
  const addIngredient = useSandwich((state) => state.addIngredient);
  const addedToCart = useSandwich((state) => state.addedToCart);
  const setAddedToCart = useSandwich((state) => state.setAddedToCart);
  const total = useSandwich((state) => state.total);

  // Memoize ingredients to avoid rerendering the ScrollView unnecessarily
  const ingredientButtons = useMemo(() => {
    return Object.keys(INGREDIENTS).map((ingredient) => (
      <View key={ingredient} style={{ padding: 10 }}>
        <AwesomeButton
          title={
            INGREDIENTS[ingredient].icon +
            ` ${capitalizeFirstLetter(ingredient)} (+Rs ${INGREDIENTS[
              ingredient
            ].price.toFixed(2)})`
          }
          onPress={() => addIngredient(ingredient)}
        />
      </View>
    ));
  }, [addIngredient]);

  // Memoize order cancellation to avoid unnecessary rerenders
  const handleCancelOrder = useCallback(() => {
    setAddedToCart(false);
  }, [setAddedToCart]);

  // Memoize add to cart function
  const handleAddToCart = useCallback(() => {
    setAddedToCart(true);
  }, [setAddedToCart]);

  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={{ padding: 20 }}>
        {addedToCart ? (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "900" }}>
              Total - RS{total.toFixed(2)}
            </Text>
            <Text style={{ color: "#666", marginTop: 4, marginBottom: 16 }}>
              Order sent successfully, it will be ready in 5 minutes! Wawa
              Sensei will directly deliver it to your home 🛵
            </Text>
            <AwesomeButton
              title="Cancel order"
              color="#fff"
              backgroundColor="#7C4DFF"
              bold
              onPress={handleCancelOrder}
            />
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
              <Text style={{ flexShrink: 1, fontSize: 22, fontWeight: "900" }}>
                Sandwich Master
              </Text>
              <Text style={{ fontWeight: "bold", color: "hotpink", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
                Made with Love by Sans
              </Text>
            </View>
            <Text style={{ color: "#666" }}>
              Fresh and delicious sandwiches made with love
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: "#ececec",
                marginVertical: 20,
              }}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "900", textAlign: "center" }}
            >
              Your Creation 
            </Text>
            <Text style={{ textAlign: "center", color: "#666" }}>
              Add more than Just You Need 
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -20,
                marginRight: -20,
              }}
            >
              {ingredientButtons}
            </ScrollView>
            <AwesomeButton
              title={`Add to cart (RS${total.toFixed(2)})`}
              color="#fff"
              backgroundColor="#7C4DFF"
              bold
              onPress={handleAddToCart}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
