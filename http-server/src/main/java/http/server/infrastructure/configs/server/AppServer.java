package http.server.infrastructure.configs.server;

import http.server.application.controllers.ApplicationController;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class AppServer {

    private static final Integer SERVER_PORT = 9090;

    private static final String APP_PATH = "/*";

    public static void initServer() {
        try {
            Server server = new Server();

            ServerConnector connector = new ServerConnector(server);
            connector.setPort(SERVER_PORT);
            connector.setHost("0.0.0.0");

            server.addConnector(connector);

            ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
            context.setContextPath("/");
            server.setHandler(context);

            context.addServlet(new ServletHolder(new ApplicationController()), APP_PATH);

            server.start();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
