QT += core gui widgets opengl

greaterThan(QT_MAJOR_VERSION, 5) {
	QT += openglwidgets
}

CONFIG += c++17

SOURCES += \
    GLWidget.cpp \
    main.cpp \
    MainWindow.cpp

HEADERS += \
    GLWidget.h \
    MainWindow.h

FORMS += \
    MainWindow.ui

RESOURCES += \
	resources.qrc

