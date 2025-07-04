import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebarCient } from "./_AppSidebarCient"

const HomePage = () => {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarCient>
      <Sidebar collapsible="icon" className="overflow-hidden">
        <SidebarHeader className="flex-row">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">WDS Jobs</span>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
        <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Home</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 mr-4">My Good</main>
      </AppSidebarCient>
    </SidebarProvider>
  )
}

export default HomePage