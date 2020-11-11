import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ComponentsPageStyle } from "./Components.style"

export default KBRD.Page((self) =>
  self.style(ComponentsPageStyle).render(({ style }) => {
    return (
      <Kiwi.View style={style.container}>
        <Kiwi.ActivityIndicator />
        <Kiwi.Button title="Test" />
        <Kiwi.CheckBox />
        {/*<Kiwi.FlatList />*/}
        {/*<Kiwi.Image />*/}
        {/*<Kiwi.ImageBackground />*/}
        {/*<Kiwi.KeyboardAvoidingView />
        <Kiwi.Modal />
        <Kiwi.Picker />*/}
        {/*<Kiwi.SafeAreaView />
        <Kiwi.ScrollView />*/}
        {/*<Kiwi.SectionList />*/}
        {/*<Kiwi.StatusBar />
        <Kiwi.Switch />
        <Kiwi.Text />
        <Kiwi.TextInput />
        <Kiwi.TouchableHighlight />
        <Kiwi.TouchableOpacity />
        <Kiwi.TouchableWithoutFeedback />
        <Kiwi.View />*/}
        {/*<Kiwi.VirtualizedList />*/}
      </Kiwi.View>
    )
  }),
)
