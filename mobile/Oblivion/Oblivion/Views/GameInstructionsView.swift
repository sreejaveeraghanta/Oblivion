import SwiftUI

// Current implementation of Oblivion is a clone of Coup, so the instructions
// reflect coup's instructions until Oblivion comes into existence
struct GameInstructionsView: View {
    @State private var gameInstructions = ""
    var body: some View {
        ZStack {
            LinearGradient(colors: [.purple, .blue], startPoint: .top, endPoint: .bottom).ignoresSafeArea()
            
            ScrollView {
                Text("Welcome to Oblivion!").padding().font(.system(size: 30) .bold())
                VStack(alignment: .leading, spacing: 20) {
                    Text(gameInstructions)
                        .foregroundColor(.black)
                        .padding()
                        .multilineTextAlignment(.center)
                        .font(.system(size: 25))
                }
            }
            
        }.onAppear() {
            readGameInstructions()
        }
    }
    
    // This function reads the game instructions from Resources/instructions
    func readGameInstructions() {
        if let filePath = Bundle.main.url(forResource: "instructions", withExtension: "txt") {
            do {
                let content = try String(contentsOf: filePath, encoding: .utf8)
                
                gameInstructions = content
            } catch {
                print("error reading game instructions")
            }
        }
        else {
            print("error loading file")
        }
    
    }

}

#Preview {
    GameInstructionsView()
}
