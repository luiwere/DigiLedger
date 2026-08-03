package handlers

import (
    "html/template"
    "net/http"
)

// DashboardPage serves the marketing dashboard page
func DashboardPage(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    tmpl, err := template.ParseFiles("templates/dashboard.html")
    if err != nil {
        http.Error(w, "Could not load page", http.StatusInternalServerError)
        return
    }
    tmpl.Execute(w, nil)
}
