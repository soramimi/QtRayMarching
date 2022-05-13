#ifndef GLWIDGET_H
#define GLWIDGET_H

#include <QOpenGLFunctions>
#include <QOpenGLShaderProgram>
#include <QOpenGLVertexArrayObject>
#include <QOpenGLWidget>
#include <QWidget>
#include <memory>

class GLWidget : public QOpenGLWidget, protected QOpenGLFunctions {
private:
	std::shared_ptr<QOpenGLShaderProgram> program_;
	QOpenGLVertexArrayObject vao_;
	GLuint vbo_;
	QVector<GLfloat> vertices_;
public:
	GLWidget(QWidget *parent = nullptr);
	~GLWidget();
	void initializeGL();
	void paintGL();
};

#endif // GLWIDGET_H
