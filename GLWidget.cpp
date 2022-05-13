#include "GLWidget.h"

GLWidget::GLWidget(QWidget *parent)
	: QOpenGLWidget(parent)
{
	vertices_
			<< -1.0f << -1.0f << 1.0f
			<< 1.0f << -1.0f << 1.0f
			<< 1.0f << 1.0f << 1.0f
			<< 1.0f << 1.0f << 1.0f
			<< -1.0f << 1.0f << 1.0f
			<< -1.0f << -1.0f << 1.0f;
}

GLWidget::~GLWidget()
{
	program_->removeAllShaders();
}

void GLWidget::initializeGL()
{
	initializeOpenGLFunctions(); //初期化
	glClearColor(0.0f, 0.0f, 0.0f, 1.0f);

	program_ = std::make_shared<QOpenGLShaderProgram>();
	program_->addShaderFromSourceFile(QOpenGLShader::Vertex, ":/hoge.vert");
	program_->addShaderFromSourceFile(QOpenGLShader::Fragment, ":/hoge.frag");
	//vaoの作成
	vao_.create();
	vao_.bind();
	//vboの作成
	glGenBuffers(1, &vbo_);
	glBindBuffer(GL_ARRAY_BUFFER, vbo_);
	glBufferData(GL_ARRAY_BUFFER, vertices_.size() * sizeof(GLfloat), vertices_.constData(), GL_STATIC_DRAW);
	//vertex shaderのコードで頂点座標のロケーションは0に指定済
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
	glEnableVertexAttribArray(0);
	vao_.release();
}

void GLWidget::paintGL()
{
	glClear(GL_COLOR_BUFFER_BIT);
	program_->bind();
	vao_.bind();
	program_->setUniformValue("resolution", QVector2D(width(), height()));
	glDrawArrays(GL_TRIANGLES, 0, vertices_.size() / 3); //ドローコール
	vao_.release();
	program_->release();
}
