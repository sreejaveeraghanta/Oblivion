import Foundation

enum Config {
    static var serverURL: URL {
        switch Environment.current {
        case .dev:
            return URL(string: "http://localhost:3001")!
        case .prod:
            return URL(string: "https://api.oblivionapp.com")!
        }
    }
}