import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ComponentsPageStyle } from "./Components.style"

export default KBRD.Page((self) =>
  self.style(ComponentsPageStyle).render(({ style }) => {
    return (
      <Kiwi.View style={style.container}>
        <Kiwi.Text style={style.title} children="ActivityIndicator" />
        <Kiwi.ActivityIndicator />

        <Kiwi.Text style={style.title} children="Button" />
        <Kiwi.Button title="Hello" />

        <Kiwi.Text style={style.title} children="CheckBox" />
        <Kiwi.CheckBox />

        <Kiwi.Text style={style.title} children="FlatList" />
        <Kiwi.FlatList
          data={[{ name: "line 1" }, { name: "line 2" }, { name: "line 3" }]}
          renderItem={({ item }) => <Kiwi.Text>{item.name}</Kiwi.Text>}
        />

        <Kiwi.Text style={style.title} children="Image" />
        <Kiwi.Image
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
          }}
          style={{ width: 100, height: 100, resizeMode: "cover" }}
        />

        <Kiwi.Text style={style.title} children="ImageBackground" />
        <Kiwi.ImageBackground
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/b/be/Bliss_location%2C_Sonoma_Valley_in_2006.jpg",
          }}
          style={{ width: 100, height: 75 }}
        />

        <Kiwi.Text style={style.title} children="KeyboardAvoidingView" />
        <Kiwi.Button title="Open view" />

        <Kiwi.Text style={style.title} children="Modal" />
        <Kiwi.Button title="Open modal" />

        <Kiwi.Text style={style.title} children="Picker" />
        <Kiwi.Picker style={{ height: 50, width: 150 }}>
          <Kiwi.PickerItem label="Line 1" value="1" />
          <Kiwi.PickerItem label="Line 2" value="2" />
          <Kiwi.PickerItem label="Line 3" value="3" />
        </Kiwi.Picker>

        <Kiwi.Text style={style.title} children="SafeAreaView" />
        <Kiwi.Button title="Open view" />

        <Kiwi.Text style={style.title} children="ScrollView" />
        <Kiwi.Button title="Open view" />

        <Kiwi.Text style={style.title} children="SectionList" />
        <Kiwi.SectionList
          renderItem={({ item }) => <Kiwi.Text>{item}</Kiwi.Text>}
          sections={[
            { title: "line 1", data: ["A1", "B1", "C1"] },
            { title: "line 2", data: ["A2", "B2", "C2"] },
            { title: "line 3", data: ["A3", "B3", "C3"] },
          ]}
        />

        <Kiwi.Text style={style.title} children="Switch" />
        <Kiwi.Switch />

        <Kiwi.Text style={style.title} children="Text" />
        <Kiwi.Text children="Hello" />

        <Kiwi.Text style={style.title} children="TextInput" />
        <Kiwi.TextInput />

        <Kiwi.Text style={style.title} children="TouchableHighlight" />
        {/*<Kiwi.TouchableHighlight />*/}

        <Kiwi.Text style={style.title} children="TouchableOpacity" />
        {/*<Kiwi.TouchableOpacity>
          <Kiwi.View>
            <Kiwi.Text>Hello</Kiwi.Text>
          </Kiwi.View>
        </Kiwi.TouchableOpacity>*/}

        <Kiwi.Text style={style.title} children="TouchableWithoutFeedback" />
        {/*<Kiwi.TouchableWithoutFeedback>
          <Kiwi.View>
            <Kiwi.Text>Hello</Kiwi.Text>
          </Kiwi.View>
        </Kiwi.TouchableWithoutFeedback>*/}

        <Kiwi.Text style={style.title} children="View" />
        <Kiwi.Button title="Open view" />

        <Kiwi.Text style={style.title} children="VirtualizedList" />
        <Kiwi.VirtualizedList
          renderItem={({ item }) => (
            <Kiwi.Text key={item.key}>{item.title}</Kiwi.Text>
          )}
          getItemCount={() => 5}
          getItem={(_, index) => {
            return {
              id: Math.random().toString(12).substring(0),
              title: `line ${index + 1}`,
            }
          }}
        />
      </Kiwi.View>
    )
  }),
)
