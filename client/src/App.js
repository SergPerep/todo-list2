import React, { useState } from "react"
import './App.css';
import { DatabaseProvider } from "./components/DatabaseContext";
import TaskNavList from "./components/TaskNavList";
import { DateAndTimePickerProvider } from "./components/Pickers/DateAndTimePickerContext";
import { ProjectPickerProvider } from "./components/Pickers/ProjectPickerContext";
import { OpenAndCloseEditProvider } from "./components/OpenAndCloseEditContext";
import SectionContent from "./components/SectionContent";
import TopNav from "./components/TopNav";
import Snackbar from "./components/Snackbar";
import { SnackbarProvider } from "./components/SnackbarContext";

function App() {
  const [selectedNavItem, setSelectedNavItem] = useState("Inbox");
  return (
    <SnackbarProvider>
      <DatabaseProvider>
          <div className="taskboard">
            <div className="taskboard-header">
              <TopNav />
            </div>
            <div className="taskboard-container">
              <OpenAndCloseEditProvider>
                <div className="taskboard-sidenav">
                  <TaskNavList data={{ selectedNavItem, setSelectedNavItem }} />
                </div>
                <div className="taskboard-display">
                  <div className="taskboard-display-container">
                    <DateAndTimePickerProvider>
                      <ProjectPickerProvider>
                        <SectionContent data={{ selectedNavItem, setSelectedNavItem }} />
                      </ProjectPickerProvider>
                    </DateAndTimePickerProvider>
                  </div>
                </div>
              </OpenAndCloseEditProvider>
            </div>
          </div>
      </DatabaseProvider>
      <Snackbar />
    </SnackbarProvider>
  );
}

export default App;
