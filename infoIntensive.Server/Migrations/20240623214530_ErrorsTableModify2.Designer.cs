﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using infoIntensive.Server.Db;

#nullable disable

namespace infoIntensive.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240623214530_ErrorsTableModify2")]
    partial class ErrorsTableModify2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblError", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Extra1")
                        .HasColumnType("text");

                    b.Property<string>("Extra2")
                        .HasColumnType("text");

                    b.Property<string>("Extra3")
                        .HasColumnType("text");

                    b.Property<DateTime>("InsertDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StackTrace")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("idUser")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("tblErrors");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblLoginLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("IpAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Success")
                        .HasColumnType("boolean");

                    b.Property<string>("UserAgent")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("idUser")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("idUser");

                    b.ToTable("tblLoginLogs");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("idTokenType")
                        .HasColumnType("integer");

                    b.Property<int>("idUser")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("idTokenType");

                    b.HasIndex("idUser");

                    b.ToTable("tblTokens");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblTokenType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("tblTokenTypes");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("FailedLoginCount")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("LastFailedLoginTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LockEndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("idUserType")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("idUserType");

                    b.ToTable("tblUsers");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblUserType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("tblUserTypes");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblLoginLog", b =>
                {
                    b.HasOne("infoIntensive.Server.Db.Models.tblUser", "tblUser")
                        .WithMany()
                        .HasForeignKey("idUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("tblUser");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblToken", b =>
                {
                    b.HasOne("infoIntensive.Server.Db.Models.tblTokenType", "tblTokenType")
                        .WithMany()
                        .HasForeignKey("idTokenType")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("infoIntensive.Server.Db.Models.tblUser", "tblUser")
                        .WithMany()
                        .HasForeignKey("idUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("tblTokenType");

                    b.Navigation("tblUser");
                });

            modelBuilder.Entity("infoIntensive.Server.Db.Models.tblUser", b =>
                {
                    b.HasOne("infoIntensive.Server.Db.Models.tblUserType", "tblUserType")
                        .WithMany()
                        .HasForeignKey("idUserType")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("tblUserType");
                });
#pragma warning restore 612, 618
        }
    }
}
