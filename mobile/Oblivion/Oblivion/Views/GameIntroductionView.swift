import SwiftUI

enum Pages: Hashable {
    case join_room
    case instructions
}

struct GameIntroductionView: View {
    @State private var path = NavigationPath()
    var body: some View {

        NavigationStack(path: $path) {
            ZStack {
                LinearGradient(
                    colors: [.purple, .blue],
                    startPoint: .top,
                    endPoint: .bottom
                ).ignoresSafeArea()
                VStack(spacing: 40) {
                    //TODO add oblivion logo as an image to this screen
                    VStack {
                        Text("Oblivion")
                            .bold()
                            .multilineTextAlignment(.center)
                            .font(.system(size: 100))
                        Text(
                            "A game of bluff and deceit where you must outwit your opponents and be the last one standing. Good Luck!"
                        )
                        .multilineTextAlignment(.center)
                    }
                    HStack {
                        Button(action: { path.append(Pages.join_room) }) {
                            Text("Get Started")
                                .padding(10)
                                .background(Color.black)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }
                        Button(action: { path.append(Pages.instructions) }) {
                            Text("How to Play")
                                .padding(10)
                                .background(Color.black)
                                .foregroundColor(.white)
                                .cornerRadius(10)
                        }
                    }

                }
                .navigationDestination(for: Pages.self) { page in
                    switch page {
                    case .join_room:
                        JoinRoomView()
                    case .instructions:
                        GameInstructionsView()
                    }

                }

            }
        }
    }

}

#Preview {
    GameIntroductionView()
}
