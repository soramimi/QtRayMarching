#include "GLWidget.h"
#include <QApplication>

int main(int argc, char *argv[])
{
	QApplication a(argc, argv);
	GLWidget w;
	w.show(); //表示
	return a.exec();
}
