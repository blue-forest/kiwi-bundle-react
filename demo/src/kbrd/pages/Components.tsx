import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { ComponentsPageStyle } from "./Components.style"

type States = {
  checkbox: boolean
  switch: boolean
  modalOpen: boolean
  picker: string
  textInput: string
}

export default KBRD.Page((self) =>
  self
    .style(ComponentsPageStyle)
    .states<States>({
      checkbox: false,
      switch: false,
      modalOpen: false,
      picker: "",
      textInput: "",
    })
    .render(({ style, states }) => {
      console.log("States :", {
        checkbox: states.get.checkbox,
        switch: states.get.switch,
        modalOpen: states.get.modalOpen,
        picker: states.get.picker,
        textInput: states.get.textInput,
      } as States)
      return (
        <Kiwi.ScrollView style={style.container}>
          <Kiwi.Text style={style.title} children="ActivityIndicator" />
          <Kiwi.ActivityIndicator />

          <Kiwi.Text style={style.title} children="Button" />
          <Kiwi.Button title="Hello" />

          <Kiwi.Text style={style.title} children="CheckBox" />
          <Kiwi.CheckBox
            value={states.get.checkbox}
            onValueChange={value => { states.set.checkbox(value) }}
          />

          <Kiwi.Text style={style.title} children="FlatList" />
          <Kiwi.FlatList
            data={[{ name: "line 1" }, { name: "line 2" }, { name: "line 3" }]}
            keyExtractor={(_, index) => index.toString()}
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
          <Kiwi.KeyboardAvoidingView style={{ width: "100%", height: 100 }}>
            <Kiwi.View style={{ flex: 1, backgroundColor: "green" }}/>
          </Kiwi.KeyboardAvoidingView>

          <Kiwi.Text style={style.title} children="Modal" />
          <Kiwi.Modal visible={states.get.modalOpen}>
            <Kiwi.View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Kiwi.Button
                title="Close modal"
                onPress={() => { states.set.modalOpen(false) }}
              />
            </Kiwi.View>
          </Kiwi.Modal>
          <Kiwi.Button
            title="Open modal"
            onPress={() => { states.set.modalOpen(true) }}
          />

          <Kiwi.Text style={style.title} children="Picker" />
          <Kiwi.Picker
            selectedValue={states.get.picker}
            onValueChange={value => { states.set.picker(value) }}
          >
            <Kiwi.PickerItem label="" value="" />
            <Kiwi.PickerItem label="Line 1" value="1" />
            <Kiwi.PickerItem label="Line 2" value="2" />
            <Kiwi.PickerItem label="Line 3" value="3" />
          </Kiwi.Picker>

          <Kiwi.Text style={style.title} children="SafeAreaView" />
          <Kiwi.Button title="Open view" />

          <Kiwi.Text style={style.title} children="ScrollView" />
          <Kiwi.ScrollView style={{ width: "100%", height: 100 }}>
            <Kiwi.View style={{ backgroundColor: "purple", height: 200 }}/>
          </Kiwi.ScrollView>

          <Kiwi.Text style={style.title} children="SectionList" />
          <Kiwi.SectionList
            renderItem={({ item }) => <Kiwi.Text children={item}/>}
            keyExtractor={(_, index) => index.toString()}
            sections={[
              { title: "line 1", data: ["A1", "B1", "C1"] },
              { title: "line 2", data: ["A2", "B2", "C2"] },
              { title: "line 3", data: ["A3", "B3", "C3"] },
            ]}
          />

          <Kiwi.Text style={style.title} children="StatusBar" />
          <Kiwi.Button title="Open view" />

          <Kiwi.Text style={style.title} children="Switch" />
          <Kiwi.Switch
            value={states.get.switch}
            onValueChange={value => { states.set.switch(value) }}
          />

          <Kiwi.Text style={style.title} children="Text" />
          <Kiwi.Text children="Hello" />

          <Kiwi.Text style={style.title} children="TextInput" />
          <Kiwi.TextInput
            value={states.get.textInput}
            onChangeText={text => { states.set.textInput(text) }}
            style={{ backgroundColor: "white" }}
          />

          <Kiwi.Text style={style.title} children="TouchableHighlight" />
          <Kiwi.TouchableHighlight
            style={{ width: 100, height: 40 }}
            onPress={() => { console.log("TouchableHighlight press") }}
          >
            <Kiwi.View style={{ flex: 1, backgroundColor: "red" }}/>
          </Kiwi.TouchableHighlight>

          <Kiwi.Text style={style.title} children="TouchableOpacity" />
          <Kiwi.TouchableOpacity
            style={{ width: 100, height: 40 }}
            onPress={() => { console.log("TouchableOpacity press") }}
          >
            <Kiwi.View style={{ flex: 1, backgroundColor: "orange" }}/>
          </Kiwi.TouchableOpacity>

          <Kiwi.Text style={style.title} children="View" />
          <Kiwi.View style={{ width: "100%", flexDirection: "row" }}>
            <Kiwi.Text style={{ flex: 1, textAlign: "center" }}>Left</Kiwi.Text>
            <Kiwi.Text style={{ flex: 1, textAlign: "center" }}>Right</Kiwi.Text>
          </Kiwi.View>

          <Kiwi.Text style={style.title} children="VirtualizedList" />
          <Kiwi.VirtualizedList
            data={[]}
            getItemCount={() => 5}
            getItem={(_, index) => ({
              id: Math.random().toString(12).substring(0),
              title: `line ${index + 1}`,
            })}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Kiwi.Text children={item.title}/>}
          />
        </Kiwi.ScrollView>
      )
  }),
)
