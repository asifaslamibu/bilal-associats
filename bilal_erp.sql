USE [bilal_erp]
GO
/****** Object:  Table [dbo].[w_house]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[w_house](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
 CONSTRAINT [PK_w_house] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[varitions]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[varitions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[varii] [varchar](250) NULL,
 CONSTRAINT [PK_varitions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[history_oil_warehouse]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[history_oil_warehouse](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [varchar](250) NULL,
	[warehouse_id] [varchar](250) NULL,
	[oil_id] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[m_unit] [varchar](250) NULL,
	[issued_date] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[oil]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[oil](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[oil_name] [varchar](250) NULL,
	[invoice] [varchar](250) NULL,
	[oil_code] [varchar](250) NULL,
	[oil_category] [varchar](250) NULL,
	[brand_name] [varchar](250) NULL,
	[qunatity] [varchar](250) NULL,
	[oil_retail_price] [varchar](250) NULL,
	[m_unit] [varchar](250) NULL,
	[valid_date] [varchar](250) NULL,
	[discription] [varchar](250) NULL,
 CONSTRAINT [PK_oil] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[oil_report]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW  [dbo].[oil_report] as
SELECT ow.quantity,ow.issued_date,wh.name,ol.oil_name,vr.varii FROM [bilal_erp].[dbo].[history_oil_warehouse] as ow inner join [bilal_erp].[dbo].[w_house] as wh on ow.warehouse_id = wh.id inner join [bilal_erp].[dbo].[oil] as ol on ow.oil_id = ol.id inner join [bilal_erp].[dbo].[varitions] as vr on ow.m_unit=vr.id
GO
/****** Object:  Table [dbo].[categories]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[c_name] [varchar](250) NULL,
 CONSTRAINT [PK_categories1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[oil_purchase]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Script for SelectTopNRows command from SSMS  ******/
CREATE VIEW  [dbo].[oil_purchase] as
SELECT ol.oil_name,ol.oil_code,ol.brand_name,ol.qunatity,ol.oil_retail_price,ol.valid_date,ol.discription,ct.c_name,vr.varii FROM [bilal_erp].[dbo].[oil] as ol
inner join [bilal_erp].[dbo].[categories] as ct on ol.oil_category=ct.id
inner join [bilal_erp].[dbo].[varitions] as vr on ol.m_unit=vr.id
GO
/****** Object:  Table [dbo].[fms_users]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fms_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NULL,
	[fname] [nvarchar](50) NULL,
	[lname] [nvarchar](50) NULL,
	[password] [nvarchar](50) NULL,
	[cnic] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
 CONSTRAINT [PK_fms_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[company]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_name] [varchar](250) NULL,
	[email] [varchar](250) NULL,
	[address] [varchar](250) NULL,
	[phone_no] [varchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[wearhouse_company]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[wearhouse_company](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [int] NOT NULL,
	[wearhouse_id] [int] NOT NULL,
	[user_id] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[wearhouse_to_company]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/****** Script for SelectTopNRows command from SSMS  ******/
CREATE   VIEW [dbo].[wearhouse_to_company] AS
SELECT cp.id,cp.company_name,wc.wearhouse_id,wh.name,fu.username FROM [bilal_erp].[dbo].[wearhouse_company] as wc
inner join [bilal_erp].[dbo].[company] as cp on wc.company_id=cp.id
inner join [bilal_erp].[dbo].[w_house] as wh on wc.wearhouse_id=wh.id
inner join [bilal_erp].[dbo].[fms_users] as fu on wc.user_id=fu.id
GO
/****** Object:  Table [dbo].[add_other_product]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[add_other_product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[invoice_no] [varchar](250) NULL,
	[product_name] [varchar](250) NULL,
	[product_code] [varchar](250) NULL,
	[category] [varchar](250) NULL,
	[sub_category] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[company_id] [varchar](255) NULL,
	[wareHouse] [varchar](250) NULL,
	[retail_price] [varchar](250) NULL,
	[measurement_unit] [varchar](250) NULL,
	[valid_date] [varchar](250) NULL,
	[discription] [varchar](250) NULL,
 CONSTRAINT [PK_add_other_product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[add_products]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[add_products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](250) NULL,
	[product_code] [varchar](250) NULL,
	[category] [varchar](250) NULL,
	[sub_category] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[company_id] [varchar](255) NULL,
	[wareHouse] [varchar](250) NULL,
	[retail_price] [varchar](250) NULL,
	[measurement_unit] [varchar](250) NULL,
	[valid_date] [varchar](250) NULL,
	[discription] [varchar](250) NULL,
 CONSTRAINT [PK_add_products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[f_roles]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[f_roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[r_name] [varchar](255) NULL,
	[r_action] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[f_roles_assign]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[f_roles_assign](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[role_id] [int] NOT NULL,
 CONSTRAINT [PK_f_roles_assign] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[history_other_product]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[history_other_product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[invoice_no] [varchar](250) NULL,
	[product_name] [varchar](250) NULL,
	[product_code] [varchar](250) NULL,
	[category] [varchar](250) NULL,
	[sub_category] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[company] [varchar](255) NULL,
	[wareHouse] [varchar](250) NULL,
	[retail_price] [varchar](250) NULL,
	[assign_time] [varchar](250) NULL,
 CONSTRAINT [history_other_products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[history_products]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[history_products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](250) NULL,
	[product_code] [varchar](250) NULL,
	[category] [varchar](250) NULL,
	[sub_category] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[company] [varchar](255) NULL,
	[wareHouse] [varchar](250) NULL,
	[retail_price] [varchar](250) NULL,
	[assign_time] [varchar](250) NULL,
 CONSTRAINT [PK_history_products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[oil_assign]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[oil_assign](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_id] [varchar](250) NULL,
	[warehouse_id] [varchar](250) NULL,
	[oil_id] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[m_unit] [varchar](250) NULL,
	[issued_date] [varchar](255) NULL,
 CONSTRAINT [PK_oil_assign] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[oil_assign_tovehicle]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[oil_assign_tovehicle](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[vehicle_no] [varchar](250) NULL,
	[brand_name] [varchar](250) NULL,
	[supply_type] [varchar](250) NULL,
	[quantity] [varchar](250) NULL,
	[company_id] [varchar](250) NULL,
	[warehouse] [varchar](250) NULL,
	[price] [varchar](250) NULL,
	[issue_date] [varchar](250) NULL,
	[operation] [varchar](250) NULL,
	[remarks] [varchar](250) NULL,
	[change_hr] [varchar](250) NULL,
	[expect_hr] [varchar](250) NULL,
	[expect_date] [varchar](250) NULL,
 CONSTRAINT [PK_oil_assign_tovehicle] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[oil_history]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[oil_history](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[invoice] [varchar](250) NULL,
	[oil_name] [varchar](250) NULL,
	[oil_code] [varchar](250) NULL,
	[oil_category] [varchar](250) NULL,
	[brand_name] [varchar](250) NULL,
	[qunatity] [varchar](250) NULL,
	[oil_retail_price] [varchar](250) NULL,
	[m_unit] [varchar](250) NULL,
	[valid_date] [varchar](250) NULL,
 CONSTRAINT [PK_history_oil] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[other_sub_product]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[other_sub_product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[invoice] [varchar](250) NULL,
	[product_name] [varchar](250) NULL,
	[product_no] [varchar](250) NULL,
	[status] [varchar](250) NULL,
	[main_product_id] [int] NOT NULL,
	[wearhouse_id] [varchar](255) NULL,
	[company_id] [varchar](255) NULL,
 CONSTRAINT [PK_other_sub_product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_other_issue]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_other_issue](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[i_date] [varchar](250) NULL,
	[v_no] [varchar](250) NULL,
	[v_type] [nvarchar](50) NULL,
	[qty] [varchar](250) NULL,
	[company_id] [varchar](250) NULL,
	[warehouse_id] [varchar](250) NULL,
	[remark] [varchar](250) NULL,
	[t_num] [varchar](250) NULL,
	[t_brand] [varchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[stock_transfer_oil]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stock_transfer_oil](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[f_com_id] [varchar](250) NULL,
	[f_ware_id] [varchar](250) NULL,
	[f_product] [varchar](250) NULL,
	[f_quantity] [varchar](250) NULL,
	[t_com_id] [varchar](250) NULL,
	[t_ware_id] [varchar](250) NULL,
	[t_date] [varchar](250) NULL,
 CONSTRAINT [PK_stock_transfer_oil] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[stock_transfer_tyre]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[stock_transfer_tyre](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[f_com] [varchar](250) NULL,
	[f_ware] [varchar](250) NULL,
	[f_product] [varchar](250) NULL,
	[f_brand] [varchar](250) NULL,
	[f_sub] [varchar](250) NULL,
	[t_com] [varchar](250) NULL,
	[t_ware] [varchar](250) NULL,
	[t_date] [varchar](250) NULL,
 CONSTRAINT [PK_stock_transfer_tyre] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sub_product]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sub_product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](250) NULL,
	[product_no] [varchar](250) NULL,
	[status] [varchar](250) NULL,
	[main_product_id] [int] NOT NULL,
	[wearhouse_id] [varchar](255) NULL,
	[company_id] [varchar](255) NULL,
 CONSTRAINT [PK_sub_product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tyre_issue]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tyre_issue](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[i_date] [varchar](250) NULL,
	[v_no] [varchar](250) NULL,
	[v_type] [nvarchar](50) NULL,
	[qty] [varchar](250) NULL,
	[warehouse_id] [varchar](250) NULL,
	[remark] [varchar](250) NULL,
	[t_num] [varchar](250) NULL,
	[t_brand] [varchar](250) NULL,
	[current_odo] [varchar](250) NULL,
	[next_odo] [varchar](250) NULL,
	[expect_date] [varchar](250) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vehicle_reg]    Script Date: 05/07/2021 11:11:58 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vehicle_reg](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[v_type] [varchar](250) NULL,
	[v_no] [varchar](250) NULL,
	[e_no] [varchar](250) NULL,
	[c_no] [varchar](250) NULL,
	[v_name] [varchar](250) NULL,
	[status] [varchar](250) NULL,
 CONSTRAINT [PK_vehicle_reg] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[add_other_product] ON 

INSERT [dbo].[add_other_product] ([id], [invoice_no], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (1, N'00123', N'Engine', N'021', N'4', N'Toyota', N'0', N'1', N'2', N'240000', N'nhi', N'2020-09-04', N'Toyota 1300cc engine purchase for BMB-943')
SET IDENTITY_INSERT [dbo].[add_other_product] OFF
GO
SET IDENTITY_INSERT [dbo].[add_products] ON 

INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (15, N'Type', N'123', N'3', N'Shall', N'0', NULL, N'1', N'122', N'nhi', N'2020-09-21', N'123')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (20, N'Rear Tyre', N'00021', N'3', N'Service', N'0', NULL, N'1', N'700', N'nhi', N'2020-09-04', N'Assigned')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (21, N'Back Tyre', N'00012', N'3', N'Panther', N'0', NULL, N'1', N'500', N'nhi', N'2020-09-03', N'Assigned tyre to warehouse.')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (22, N'Car Tyre', N'00026', N'3', N'Dunlop', N'0', NULL, N'1', N'50', N'nhi', N'2020-09-04', N'Issued to Warehouse')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (23, N'Car back tyre', N'00212', N'3', N'Dunlop', N'0', NULL, N'1', N'700', N'nhi', N'2020-09-04', N'Issued')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (24, N'Tyre One', N'223', N'3', N'Future', N'2', NULL, N'2', N'700', N'nhi', N'2020-09-04', N'Issued')
INSERT [dbo].[add_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company_id], [wareHouse], [retail_price], [measurement_unit], [valid_date], [discription]) VALUES (25, N'General Tyre', N'2211', N'3', N'General', N'2', N'1', N'1', N'500', N'nhi', N'2020-09-04', N'Issued')
SET IDENTITY_INSERT [dbo].[add_products] OFF
GO
SET IDENTITY_INSERT [dbo].[categories] ON 

INSERT [dbo].[categories] ([id], [c_name]) VALUES (3, N'Spare Part')
INSERT [dbo].[categories] ([id], [c_name]) VALUES (5, N'Others')
INSERT [dbo].[categories] ([id], [c_name]) VALUES (6, N'Oil')
INSERT [dbo].[categories] ([id], [c_name]) VALUES (7, N'Tyre')
SET IDENTITY_INSERT [dbo].[categories] OFF
GO
SET IDENTITY_INSERT [dbo].[company] ON 

INSERT [dbo].[company] ([id], [company_name], [email], [address], [phone_no]) VALUES (1, N'Main P2P Track', N'track@gmal.com', N'shahrah e faisal', N'123456789')
INSERT [dbo].[company] ([id], [company_name], [email], [address], [phone_no]) VALUES (2, N'Trade Once', N'tradeonce@gmail.com', N'shahrah e faisal', N'03222772986')
SET IDENTITY_INSERT [dbo].[company] OFF
GO
SET IDENTITY_INSERT [dbo].[f_roles] ON 

INSERT [dbo].[f_roles] ([id], [r_name], [r_action]) VALUES (1, N'Admin', N'{"create":"1","update":"1","delete1":"1","view":{}}')
INSERT [dbo].[f_roles] ([id], [r_name], [r_action]) VALUES (5, N'Editor', N'{"create":0,"update":"1","delete1":"1","view":{}}')
INSERT [dbo].[f_roles] ([id], [r_name], [r_action]) VALUES (6, N'Viewer', N'{"create":0,"update":0,"delete1":0,"view":{}}')
SET IDENTITY_INSERT [dbo].[f_roles] OFF
GO
SET IDENTITY_INSERT [dbo].[f_roles_assign] ON 

INSERT [dbo].[f_roles_assign] ([id], [user_id], [role_id]) VALUES (2, 2, 1)
SET IDENTITY_INSERT [dbo].[f_roles_assign] OFF
GO
SET IDENTITY_INSERT [dbo].[fms_users] ON 

INSERT [dbo].[fms_users] ([id], [username], [fname], [lname], [password], [cnic], [email]) VALUES (2, N'bilal', N'bilal', N'assoc', N'bilal123', NULL, NULL)
INSERT [dbo].[fms_users] ([id], [username], [fname], [lname], [password], [cnic], [email]) VALUES (4, N'Hamza', N'Ahmed', N'Hamza', N'hamza123', N'12345667666', N'hamza@gmail.com')
SET IDENTITY_INSERT [dbo].[fms_users] OFF
GO
SET IDENTITY_INSERT [dbo].[history_oil_warehouse] ON 

INSERT [dbo].[history_oil_warehouse] ([id], [company_id], [warehouse_id], [oil_id], [quantity], [m_unit], [issued_date]) VALUES (1, N'1', N'2', N'3', N'101', N'1', N'2021-07-01')
INSERT [dbo].[history_oil_warehouse] ([id], [company_id], [warehouse_id], [oil_id], [quantity], [m_unit], [issued_date]) VALUES (2, N'2', N'1', N'1', N'100', N'1', N'2021-07-01')
SET IDENTITY_INSERT [dbo].[history_oil_warehouse] OFF
GO
SET IDENTITY_INSERT [dbo].[history_other_product] ON 

INSERT [dbo].[history_other_product] ([id], [invoice_no], [product_name], [product_code], [category], [sub_category], [quantity], [company], [wareHouse], [retail_price], [assign_time]) VALUES (1, N'00123', N'Engine', N'021', N'4', N'Toyota', N'1', N'1', N'2', N'240000', N'2020-09-04')
SET IDENTITY_INSERT [dbo].[history_other_product] OFF
GO
SET IDENTITY_INSERT [dbo].[history_products] ON 

INSERT [dbo].[history_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company], [wareHouse], [retail_price], [assign_time]) VALUES (1, N'Car Tyre', N'00026', N'3', N'Dunlop', N'2', NULL, N'1', N'50', N'2020-09-04')
INSERT [dbo].[history_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company], [wareHouse], [retail_price], [assign_time]) VALUES (3, N'Car back tyre', N'00212', N'3', N'Dunlop', N'2', NULL, N'1', N'700', N'6/29/2021, 3:21:01 AM')
INSERT [dbo].[history_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company], [wareHouse], [retail_price], [assign_time]) VALUES (4, N'Tyre One', N'223', N'3', N'Future', N'2', NULL, N'2', N'700', N'2020-09-04')
INSERT [dbo].[history_products] ([id], [product_name], [product_code], [category], [sub_category], [quantity], [company], [wareHouse], [retail_price], [assign_time]) VALUES (5, N'General Tyre', N'2211', N'3', N'General', N'2', N'1', N'1', N'500', N'2020-09-04')
SET IDENTITY_INSERT [dbo].[history_products] OFF
GO
SET IDENTITY_INSERT [dbo].[oil] ON 

INSERT [dbo].[oil] ([id], [oil_name], [invoice], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date], [discription]) VALUES (1, N'Green Oil', N'0012', N'232', N'3', N'Shall', N'1150', N'100', N'1', N'2020-09-04', N'Issued...')
SET IDENTITY_INSERT [dbo].[oil] OFF
GO
SET IDENTITY_INSERT [dbo].[oil_assign] ON 

INSERT [dbo].[oil_assign] ([id], [company_id], [warehouse_id], [oil_id], [quantity], [m_unit], [issued_date]) VALUES (1, N'1', N'2', N'3', N'91', N'1', N'2021-07-01')
INSERT [dbo].[oil_assign] ([id], [company_id], [warehouse_id], [oil_id], [quantity], [m_unit], [issued_date]) VALUES (2, N'2', N'1', N'1', N'100', N'1', N'2021-07-01')
SET IDENTITY_INSERT [dbo].[oil_assign] OFF
GO
SET IDENTITY_INSERT [dbo].[oil_assign_tovehicle] ON 

INSERT [dbo].[oil_assign_tovehicle] ([id], [vehicle_no], [brand_name], [supply_type], [quantity], [company_id], [warehouse], [price], [issue_date], [operation], [remarks], [change_hr], [expect_hr], [expect_date]) VALUES (1, N'1', N'1', N'2', N'10', N'1', N'2', N'100', N'2021-07-01', N'1', N'Issued', N'300', N'320', N'2021-07-31')
SET IDENTITY_INSERT [dbo].[oil_assign_tovehicle] OFF
GO
SET IDENTITY_INSERT [dbo].[oil_history] ON 

INSERT [dbo].[oil_history] ([id], [invoice], [oil_name], [oil_code], [oil_category], [brand_name], [qunatity], [oil_retail_price], [m_unit], [valid_date]) VALUES (1, N'0012', N'Green Oil', N'232', N'3', N'Shall', N'1250', N'100', N'1', N'2020-09-04')
SET IDENTITY_INSERT [dbo].[oil_history] OFF
GO
SET IDENTITY_INSERT [dbo].[other_sub_product] ON 

INSERT [dbo].[other_sub_product] ([id], [invoice], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (1, NULL, N'Complete Engine ', N'011', N'Used', 1, N'2', N'1')
SET IDENTITY_INSERT [dbo].[other_sub_product] OFF
GO
SET IDENTITY_INSERT [dbo].[product_other_issue] ON 

INSERT [dbo].[product_other_issue] ([id], [i_date], [v_no], [v_type], [qty], [company_id], [warehouse_id], [remark], [t_num], [t_brand]) VALUES (1, N'2021-07-02', N'1', N'7', N'1', N'1', N'2', N'Checking..', N'011', N'1')
SET IDENTITY_INSERT [dbo].[product_other_issue] OFF
GO
SET IDENTITY_INSERT [dbo].[stock_transfer_oil] ON 

INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (13, N'2', N'1', N'oil', N'22', N'1', N'2', N'')
INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (14, N'2', N'1', N'oil', N'22', N'1', N'2', N'')
INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (15, N'2', N'1', N'oil', N'12', N'2', N'1', N'2021-07-01')
INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (16, N'2', N'1', N'oil', N'12', N'2', N'1', N'2021-07-01')
INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (17, N'1', N'2', N'oil', N'12', N'2', N'1', N'2021-07-01')
INSERT [dbo].[stock_transfer_oil] ([id], [f_com_id], [f_ware_id], [f_product], [f_quantity], [t_com_id], [t_ware_id], [t_date]) VALUES (18, N'2', N'1', N'oil', N'12', N'2', N'1', N'2021-07-05')
SET IDENTITY_INSERT [dbo].[stock_transfer_oil] OFF
GO
SET IDENTITY_INSERT [dbo].[stock_transfer_tyre] ON 

INSERT [dbo].[stock_transfer_tyre] ([id], [f_com], [f_ware], [f_product], [f_brand], [f_sub], [t_com], [t_ware], [t_date]) VALUES (1, N'2', N'1', N'tyre', N'22', N'29', N'1', N'1', N'2021-07-04')
INSERT [dbo].[stock_transfer_tyre] ([id], [f_com], [f_ware], [f_product], [f_brand], [f_sub], [t_com], [t_ware], [t_date]) VALUES (2, N'2', N'1', N'tyre', N'21', N'23', N'2', N'1', N'2021-07-06')
INSERT [dbo].[stock_transfer_tyre] ([id], [f_com], [f_ware], [f_product], [f_brand], [f_sub], [t_com], [t_ware], [t_date]) VALUES (3, N'2', N'1', N'tyre', N'21', N'23', N'2', N'1', N'2021-07-06')
INSERT [dbo].[stock_transfer_tyre] ([id], [f_com], [f_ware], [f_product], [f_brand], [f_sub], [t_com], [t_ware], [t_date]) VALUES (4, N'2', N'1', N'tyre', N'21', N'24', N'2', N'1', N'2021-07-01')
SET IDENTITY_INSERT [dbo].[stock_transfer_tyre] OFF
GO
SET IDENTITY_INSERT [dbo].[sub_product] ON 

INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (10, N'Dunlop Tyre', N'tyre001', N'Used', 15, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (20, N'Product 1', N'001', N'New', 20, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (21, N'Product 2', N'002', N'New', 20, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (22, N'Product 3', N'003', N'New', 20, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (23, N'Product 1', N'1', N'New', 21, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (24, N'Product 2', N'2', N'New', 21, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (25, N'Product 3', N'3', N'New', 21, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (26, N'Product 4', N'4', N'New', 21, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (27, N'Product 5', N'5', N'New', 21, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (28, N'Product 1', N'1', N'New', 22, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (29, N'Product', N'2', N'New', 22, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (30, N'Product 1', N'1', N'New', 23, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (31, N'Product 2', N'2', N'New', 23, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (32, N'Fut 1', N'12', N'New', 24, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (33, N'fut 2', N'2', N'New', 24, NULL, NULL)
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (34, N'gen2', N'2', N'New', 25, N'1', N'1')
INSERT [dbo].[sub_product] ([id], [product_name], [product_no], [status], [main_product_id], [wearhouse_id], [company_id]) VALUES (35, N'gen 1', N'1', N'New', 25, N'1', N'1')
SET IDENTITY_INSERT [dbo].[sub_product] OFF
GO
SET IDENTITY_INSERT [dbo].[tyre_issue] ON 

INSERT [dbo].[tyre_issue] ([id], [i_date], [v_no], [v_type], [qty], [warehouse_id], [remark], [t_num], [t_brand], [current_odo], [next_odo], [expect_date]) VALUES (1, N'2021-06-01', N'1', N'8', N'1', N'1', N'Tyes Issued', N'30', N'23', N'1200', N'1450', N'2021-06-15')
SET IDENTITY_INSERT [dbo].[tyre_issue] OFF
GO
SET IDENTITY_INSERT [dbo].[varitions] ON 

INSERT [dbo].[varitions] ([id], [varii]) VALUES (1, N'Ltr')
SET IDENTITY_INSERT [dbo].[varitions] OFF
GO
SET IDENTITY_INSERT [dbo].[vehicle_reg] ON 

INSERT [dbo].[vehicle_reg] ([id], [v_type], [v_no], [e_no], [c_no], [v_name], [status]) VALUES (1, N'Car', N'BMB-943', N'1234567', N'1234567', N'Honda', N'on')
INSERT [dbo].[vehicle_reg] ([id], [v_type], [v_no], [e_no], [c_no], [v_name], [status]) VALUES (3, N'Motorcycle', N'KKM-3477', N'1234567', N'1234567', N'Suzuki', N'on')
INSERT [dbo].[vehicle_reg] ([id], [v_type], [v_no], [e_no], [c_no], [v_name], [status]) VALUES (6, N'Car', N'AFP-751', N'033234', N'90754', N'Suzuki Baleno', N'on')
SET IDENTITY_INSERT [dbo].[vehicle_reg] OFF
GO
SET IDENTITY_INSERT [dbo].[w_house] ON 

INSERT [dbo].[w_house] ([id], [name]) VALUES (1, N'P2P Track')
INSERT [dbo].[w_house] ([id], [name]) VALUES (2, N'Bilal ')
SET IDENTITY_INSERT [dbo].[w_house] OFF
GO
SET IDENTITY_INSERT [dbo].[wearhouse_company] ON 

INSERT [dbo].[wearhouse_company] ([id], [company_id], [wearhouse_id], [user_id]) VALUES (3, 1, 1, 2)
INSERT [dbo].[wearhouse_company] ([id], [company_id], [wearhouse_id], [user_id]) VALUES (4, 1, 2, 2)
INSERT [dbo].[wearhouse_company] ([id], [company_id], [wearhouse_id], [user_id]) VALUES (5, 2, 1, 2)
INSERT [dbo].[wearhouse_company] ([id], [company_id], [wearhouse_id], [user_id]) VALUES (6, 1, 1, 2)
INSERT [dbo].[wearhouse_company] ([id], [company_id], [wearhouse_id], [user_id]) VALUES (7, 1, 2, 2)
SET IDENTITY_INSERT [dbo].[wearhouse_company] OFF
GO
ALTER TABLE [dbo].[f_roles_assign]  WITH NOCHECK ADD  CONSTRAINT [FK_f_roles_assign_f_roles1] FOREIGN KEY([role_id])
REFERENCES [dbo].[f_roles] ([id])
NOT FOR REPLICATION 
GO
ALTER TABLE [dbo].[f_roles_assign] CHECK CONSTRAINT [FK_f_roles_assign_f_roles1]
GO
ALTER TABLE [dbo].[f_roles_assign]  WITH NOCHECK ADD  CONSTRAINT [FK_f_roles_assign_fms_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[fms_users] ([id])
NOT FOR REPLICATION 
GO
ALTER TABLE [dbo].[f_roles_assign] CHECK CONSTRAINT [FK_f_roles_assign_fms_users]
GO
