package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// MockedData represents the mocked data structure.
type MockedData struct {
	Message string `json:"message"`
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	http.HandleFunc("/fetch-data", func(w http.ResponseWriter, r *http.Request) {
		// Mocked data
		data := MockedData{
			Message: "Hello from the server!",
		}

		// Convert to JSON
		jsonData, err := json.Marshal(data)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Set headers
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)

		// Write JSON response
		w.Write(jsonData)
	})

	fmt.Println("Server listening on :8080")
	http.ListenAndServe(":8080", nil)
}
