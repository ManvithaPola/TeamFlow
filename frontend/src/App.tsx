import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { TaskProvider } from "./contexts/TaskContext";
import { RCAProvider } from "./contexts/RCAContext";
import { RCASectionProvider } from "./contexts/RCASectionContext";
import { CommentProvider } from "./contexts/CommentContext";
import { AttachmentProvider } from "./contexts/AttachmentContext";
import { UserProvider } from "./contexts/UserContext";
import { ProjectMemberProvider } from "./contexts/ProjectMemberContext";

function App() {

  return (
    <AuthProvider>
      <NotificationProvider>
          <ProjectProvider>
            <ProjectMemberProvider>
            <TaskProvider>
              <RCAProvider>
                <RCASectionProvider>
                  <CommentProvider>
                    <AttachmentProvider>
                      <UserProvider>
                        <SidebarProvider>
                          <AppRoutes />
                        </SidebarProvider>
                      </UserProvider>
                    </AttachmentProvider>
                  </CommentProvider>
                </RCASectionProvider>
              </RCAProvider>
            </TaskProvider>
            </ProjectMemberProvider>
          </ProjectProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
