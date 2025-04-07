# App Service Plan (Windows)
resource "azurerm_service_plan" "asp" {
  name                = var.app_service_plan_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Windows"  # Required for Windows
  sku_name            = "S1"       # Standard pricing tier
}

# Windows Web App (Node.js 18)
resource "azurerm_windows_web_app" "app" {
  name                = var.app_service_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id

  site_config {
    always_on = true
    application_stack {
      node_version = "~18"  # Use tilde (~) syntax instead of "-lts"
    }
  }

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE     = "1"
    NODE_ENV                     = "production"
    WEBSITE_NODE_DEFAULT_VERSION = "~18"  # Match node_version
  }
}
