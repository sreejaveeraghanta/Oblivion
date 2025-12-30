import SwiftUI

struct GameInstructionsView: View {
    var body: some View {
        //TODO fill in game instructions and rules into each section of this page
        ScrollView {
            VStack {
                Text("Welcome to Oblivion!").font(.system(size: 35)).padding(10)
            }
            VStack {
                Text("Contents")
            }.padding()
            
            VStack {
                Text("Objective")
            }.padding()
            
            VStack {
                Text("Set Up")
            }.padding()
            
            VStack {
                Text("Rules")
            }.padding()
            
            VStack {
                Text("Game Play")
            }
            .padding()
            
            VStack {
                Text("Actions")
            }.padding()
        }.padding()
    }
}

#Preview {
    GameInstructionsView()
}
